# preprocess.py
import pandas as pd
from pymongo import MongoClient

def preprocess_data():
    # Connect to MongoDB
    client = MongoClient('mongodb://localhost:27017/')
    db = client['hospital']
    doctors_collection = db['doctors']
    patients_collection = db['patients']

    # Fetch data from MongoDB
    doctors = pd.DataFrame(list(doctors_collection.find()))
    patients = pd.DataFrame(list(patients_collection.find()))

    # Example preprocessing; adjust as necessary
    doctors['combined_specializations'] = doctors.apply(
        lambda row: row['specialization1'] + ',' + row['specialization2'], axis=1)
    doctors = pd.get_dummies(doctors, columns=['combined_specializations'])

    data = patients.merge(doctors, left_on='condition', right_on='combined_specializations')
    X = data.drop(columns=['first_name', 'last_name', '_id_x', '_id_y', 'condition', 'name'])
    y = data['name']

    return X, y

# Save preprocessed data to a file
X, y = preprocess_data()
X.to_csv('X.csv', index=False)
y.to_csv('y.csv', index=False)
