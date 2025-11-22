
# But-For Damages Analyzer - Backend Documentation

Full-stack application with Flask backend and SQLite database for storing evaluees, cases, and calculation results.

## Quick Start

```bash
# 1. Setup (first time only)
./setup.sh

# 2. Run the application
./run.sh

# 3. Open browser to http://localhost:5000
```

## Architecture

### Backend Stack
- **Framework**: Flask 3.0
- **Database**: SQLite (upgradeable to PostgreSQL)
- **ORM**: SQLAlchemy
- **API**: RESTful JSON API
- **CORS**: Enabled for local development

### Database Schema

#### Evaluees Table
- `id`: Primary key
- `profile_name`: Unique evaluee name (e.g., "Ramirez, Carmen")
- `created_at`, `updated_at`: Timestamps

#### Cases Table
- `id`: Primary key
- `evaluee_id`: Foreign key to evaluees
- `case_name`: Case name (e.g., "Ramirez v. XYZ Corp")
- `case_type`: pi, mm, or wd
- `date_of_birth`, `incident_date`, `valuation_date`: Key dates
- `wle_years`, `yfs_years`, `le_years`: Life expectancy values
- `assumptions`: JSON field with all calculation assumptions
- `latest_calculation`: JSON field with most recent results
- `created_at`, `updated_at`: Timestamps

#### Calculations Table
- `id`: Primary key
- `case_id`: Foreign key to cases
- `calculated_at`: Timestamp
- `description`: Optional description
- `assumptions`: JSON field with assumptions used
- `results`: JSON field with full calculation results
- `total_damages_pv`, `past_damages`, `future_damages_pv`: Summary values

### File Structure

```
butfor-damages-analyzer/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── models.py           # Database models
│   └── config.py           # Configuration
├── static/
│   ├── index.html          # Frontend application
│   ├── api.js              # API client library
│   └── api-bridge.js       # localStorage → API bridge
├── data/
│   └── bfda.db            # SQLite database (created on first run)
├── requirements.txt        # Python dependencies
├── setup.sh               # Setup script
├── run.sh                 # Run script
└── README.md              # Main documentation
```

## API Endpoints

### Evaluees

#### GET /api/evaluees
Get all evaluees

**Response:**
```json
{
  "success": true,
  "evaluees": [
    {
      "id": 1,
      "profile_name": "Ramirez, Carmen",
      "created_at": "2025-01-15T10:30:00",
      "updated_at": "2025-01-15T14:20:00",
      "case_count": 3
    }
  ]
}
```

#### GET /api/evaluees/:id
Get specific evaluee with cases

**Response:**
```json
{
  "success": true,
  "evaluee": {
    "id": 1,
    "profile_name": "Ramirez, Carmen",
    "cases": [...]
  }
}
```

#### POST /api/evaluees
Create new evaluee

**Request:**
```json
{
  "profile_name": "Smith, John"
}
```

**Response:**
```json
{
  "success": true,
  "evaluee": {...}
}
```

#### PUT /api/evaluees/:id
Update evaluee

**Request:**
```json
{
  "profile_name": "Smith, John Jr."
}
```

#### DELETE /api/evaluees/:id
Delete evaluee (cascades to all cases and calculations)

### Cases

#### GET /api/evaluees/:evaluee_id/cases
Get all cases for an evaluee

#### GET /api/cases/:case_id
Get specific case

**Query params:**
- `include_history=true` - Include calculation history

#### POST /api/evaluees/:evaluee_id/cases
Create new case

**Request:**
```json
{
  "case_name": "Ramirez v. XYZ Corp",
  "case_type": "pi",
  "date_of_birth": "1985-03-15",
  "incident_date": "2023-06-20",
  "valuation_date": "2025-01-15",
  "wle_years": 24.5,
  "yfs_years": 29.5,
  "le_years": 41.2,
  "assumptions": {...}
}
```

#### PUT /api/cases/:case_id
Update case

#### DELETE /api/cases/:case_id
Delete case

### Calculations

#### GET /api/cases/:case_id/calculations
Get calculation history for a case

#### GET /api/calculations/:calc_id
Get specific calculation with full details

#### POST /api/cases/:case_id/calculations
Save a calculation result

**Request:**
```json
{
  "description": "Baseline calculation",
  "assumptions": {...},
  "results": {...},
  "total_damages_pv": 1250000.00,
  "past_damages": 350000.00,
  "future_damages_pv": 900000.00
}
```

#### DELETE /api/calculations/:calc_id
Delete a calculation

### Utilities

#### GET /api/search?q=query
Search evaluees and cases

**Response:**
```json
{
  "success": true,
  "query": "Ramirez",
  "results": {
    "evaluees": [...],
    "cases": [...]
  }
}
```

#### GET /api/stats
Get database statistics

**Response:**
```json
{
  "success": true,
  "stats": {
    "evaluees": 25,
    "cases": 87,
    "calculations": 243
  }
}
```

## Configuration

### Environment Variables

- `FLASK_ENV`: `development` or `production` (default: `development`)
- `SECRET_KEY`: Flask secret key (default: auto-generated)
- `DATABASE_URL`: Database connection string (default: SQLite in `data/bfda.db`)
- `PORT`: Server port (default: 5000)

### Database Configuration

**SQLite (default):**
```python
SQLALCHEMY_DATABASE_URI = 'sqlite:///data/bfda.db'
```

**PostgreSQL (production):**
```python
SQLALCHEMY_DATABASE_URI = 'postgresql://user:pass@host:5432/dbname'
```

To switch to PostgreSQL:
1. Install: `pip install psycopg2-binary`
2. Set `DATABASE_URL` environment variable
3. Run setup script

## Development

### Adding New Fields

1. Update `models.py`:
```python
class Case(db.Model):
    # Add new field
    new_field = db.Column(db.String(200))
```

2. Recreate database:
```bash
rm data/bfda.db
./setup.sh
```

### Database Migrations

For production, use Flask-Migrate:
```bash
pip install Flask-Migrate
flask db init
flask db migrate -m "Add new field"
flask db upgrade
```

### Testing API

Use curl:
```bash
# Get all evaluees
curl http://localhost:5000/api/evaluees

# Create evaluee
curl -X POST http://localhost:5000/api/evaluees \
  -H "Content-Type: application/json" \
  -d '{"profile_name": "Test, User"}'

# Get stats
curl http://localhost:5000/api/stats
```

## Deployment

### Local Production

```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 'backend.app:create_app()'
```

### Docker

Create `Dockerfile`:
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "backend.app:create_app()"]
```

Build and run:
```bash
docker build -t bfda .
docker run -p 5000:5000 -v $(pwd)/data:/app/data bfda
```

### Cloud Deployment

**Heroku:**
```bash
heroku create bfda-app
heroku addons:create heroku-postgresql
git push heroku main
```

**AWS / DigitalOcean:**
- Use gunicorn + nginx
- Set up PostgreSQL database
- Configure environment variables
- Enable HTTPS with Let's Encrypt

## Backup & Restore

### Backup Database

```bash
# SQLite
cp data/bfda.db data/bfda.backup.db

# PostgreSQL
pg_dump dbname > backup.sql
```

### Export All Data

```bash
# Using API
curl http://localhost:5000/api/evaluees > evaluees.json
```

### Restore

```bash
# SQLite
cp data/bfda.backup.db data/bfda.db

# PostgreSQL
psql dbname < backup.sql
```

## Troubleshooting

### Port Already in Use

```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Database Locked

```bash
# SQLite - close all connections
rm data/bfda.db-journal

# Or restart server
```

### CORS Errors

Update `config.py`:
```python
CORS_ORIGINS = ['http://localhost:5000', 'http://yourdomain.com']
```

### Import Errors

```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

## Security

### Production Checklist

- [ ] Set strong `SECRET_KEY`
- [ ] Use PostgreSQL (not SQLite)
- [ ] Enable HTTPS
- [ ] Add authentication (Flask-Login or JWT)
- [ ] Set up rate limiting
- [ ] Enable CSR F protection
- [ ] Configure CORS properly
- [ ] Regular database backups
- [ ] Monitor logs
- [ ] Keep dependencies updated

### Adding Authentication

Example with Flask-Login:
```python
from flask_login import LoginManager, login_required

@app.route('/api/evaluees')
@login_required
def get_evaluees():
    ...
```

## Performance

### Optimization Tips

1. **Add indexes:**
```python
class Case(db.Model):
    case_name = db.Column(db.String(300), index=True)
```

2. **Use pagination:**
```python
cases = Case.query.paginate(page=1, per_page=20)
```

3. **Cache results:**
```python
from flask_caching import Cache
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

@cache.cached(timeout=300)
def get_evaluees():
    ...
```

4. **Optimize queries:**
```python
# Use eager loading
evaluee = Evaluee.query.options(
    db.joinedload(Evaluee.cases)
).get(id)
```

## Support

For issues or questions:
- Check logs: `tail -f backend/app.log`
- Review API responses
- Check database: `sqlite3 data/bfda.db`

---

**Version**: 1.0
**Last Updated**: 2025-11-05
