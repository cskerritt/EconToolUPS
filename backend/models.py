"""
Database models for But-For Damages Analyzer
"""
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import JSON

db = SQLAlchemy()


class Evaluee(db.Model):
    """
    Evaluee (plaintiff/claimant) profile
    """
    __tablename__ = 'evaluees'

    id = db.Column(db.Integer, primary_key=True)
    profile_name = db.Column(db.String(200), unique=True, nullable=False, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    cases = db.relationship('Case', back_populates='evaluee', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'profile_name': self.profile_name,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'case_count': len(self.cases)
        }


class Case(db.Model):
    """
    Individual case for an evaluee
    """
    __tablename__ = 'cases'

    id = db.Column(db.Integer, primary_key=True)
    evaluee_id = db.Column(db.Integer, db.ForeignKey('evaluees.id'), nullable=False)

    # Case metadata
    case_name = db.Column(db.String(300), nullable=False)
    case_type = db.Column(db.String(20), default='pi')  # pi, mm, wd

    # Dates
    date_of_birth = db.Column(db.Date, nullable=True)
    incident_date = db.Column(db.Date, nullable=True)
    valuation_date = db.Column(db.Date, nullable=True)

    # Life expectancy data
    wle_years = db.Column(db.Float, nullable=True)
    yfs_years = db.Column(db.Float, nullable=True)
    le_years = db.Column(db.Float, nullable=True)

    # Complete assumptions as JSON
    assumptions = db.Column(JSON, nullable=True)

    # Latest calculation results
    latest_calculation = db.Column(JSON, nullable=True)

    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    evaluee = db.relationship('Evaluee', back_populates='cases')
    calculations = db.relationship('Calculation', back_populates='case', cascade='all, delete-orphan')

    def to_dict(self, include_assumptions=True, include_calculations=False):
        result = {
            'id': self.id,
            'evaluee_id': self.evaluee_id,
            'case_name': self.case_name,
            'case_type': self.case_type,
            'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'incident_date': self.incident_date.isoformat() if self.incident_date else None,
            'valuation_date': self.valuation_date.isoformat() if self.valuation_date else None,
            'wle_years': self.wle_years,
            'yfs_years': self.yfs_years,
            'le_years': self.le_years,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

        if include_assumptions:
            result['assumptions'] = self.assumptions
            result['latest_calculation'] = self.latest_calculation

        if include_calculations:
            result['calculation_history'] = [c.to_dict() for c in self.calculations]

        return result


class Calculation(db.Model):
    """
    Stored calculation results (history)
    """
    __tablename__ = 'calculations'

    id = db.Column(db.Integer, primary_key=True)
    case_id = db.Column(db.Integer, db.ForeignKey('cases.id'), nullable=False)

    # Calculation metadata
    calculated_at = db.Column(db.DateTime, default=datetime.utcnow)
    description = db.Column(db.String(500), nullable=True)

    # Assumptions used
    assumptions = db.Column(JSON, nullable=False)

    # Results
    results = db.Column(JSON, nullable=False)

    # Summary values
    total_damages_pv = db.Column(db.Float, nullable=True)
    past_damages = db.Column(db.Float, nullable=True)
    future_damages_pv = db.Column(db.Float, nullable=True)

    # Relationships
    case = db.relationship('Case', back_populates='calculations')

    def to_dict(self, include_full_results=False):
        result = {
            'id': self.id,
            'case_id': self.case_id,
            'calculated_at': self.calculated_at.isoformat() if self.calculated_at else None,
            'description': self.description,
            'total_damages_pv': self.total_damages_pv,
            'past_damages': self.past_damages,
            'future_damages_pv': self.future_damages_pv,
        }

        if include_full_results:
            result['assumptions'] = self.assumptions
            result['results'] = self.results

        return result


def init_db(app):
    """Initialize database"""
    db.init_app(app)
    with app.app_context():
        db.create_all()
