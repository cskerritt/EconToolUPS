import pytest

from backend.app import create_app
from backend.models import db


@pytest.fixture()
def client():
    app = create_app('testing')
    with app.app_context():
        yield app.test_client()
        db.session.remove()


def _create_case(client):
    evaluee_resp = client.post('/api/evaluees', json={'profile_name': 'Tester'})
    evaluee_id = evaluee_resp.get_json()['evaluee']['id']
    case_resp = client.post(f'/api/evaluees/{evaluee_id}/cases', json={'case_name': 'Accuracy Check'})
    return case_resp.get_json()['case']['id']


def test_save_calculation_rejects_out_of_range_growth(client):
    case_id = _create_case(client)
    payload = {
        'assumptions': {
            'butFor': {'growth': 0.5},
            'discount': {'rate': 0.03},
            'aef': {'ufEff': 0.05},
        },
        'results': {},
    }

    resp = client.post(f'/api/cases/{case_id}/calculations', json=payload)
    data = resp.get_json()

    assert resp.status_code == 400
    assert data['success'] is False
    assert any('Growth rate' in violation for violation in data['violations'])


def test_save_calculation_accepts_in_range_inputs(client):
    case_id = _create_case(client)
    payload = {
        'assumptions': {
            'butFor': {'growth': 0.02},
            'discount': {'rate': 0.04},
            'aef': {'ufEff': 0.08, 'tlEff': 0.25, 'fringePct': 0.22},
        },
        'results': {'totals': {}},
    }

    resp = client.post(f'/api/cases/{case_id}/calculations', json=payload)
    data = resp.get_json()

    assert resp.status_code == 201
    assert data['success'] is True
    assert data['calculation']['assumptions']['butFor']['growth'] == 0.02
