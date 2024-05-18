# preprocess.py
import pandas as pd
import requests

def fetch_data_from_neurelo(endpoint):
    url = f"https://api.neurelo.com/{endpoint}"
    headers = {
        'Authorization': 'Bearer YOUR_NEURELO_API_KEY'
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Raise an error for bad status codes
    return response.json()

def preprocess_data():
    doctors = pd.DataFrame(fetch_data_from_neurelo('doctors'))
    patients = pd.DataFrame(fetch_data_from_neurelo('patients'))

    # Example preprocessing; adjust as necessary
    doctors['combined_confidence'] = (doctors['confidence_rating_1'] + doctors['confidence_rating_2']) / 2
    doctors = doctors.drop(columns=['_id'])  # Drop MongoDB ObjectId
    
    patients = patients.drop(columns=['_id'])  # Drop MongoDB ObjectId

    X = patients[['first_name', 'last_name', 'condition']]
    y = doctors[['name', 'specialization_1', 'specialization_2', 'combined_confidence']]

    return X, y

# Save preprocessed data to a file
X, y = preprocess_data()
X.to_csv('X.csv', index=False)
y.to_csv('y.csv', index=False)
