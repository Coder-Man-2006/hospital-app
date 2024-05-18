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
    doctors['specializations'] = doctors['specializations'].apply(lambda x: ','.join(x))
    doctors = pd.get_dummies(doctors, columns=['specializations'])

    data = patients.merge(doctors, left_on='illness_category', right_on='specializations')
    X = data.drop(columns=['name_x', 'name_y', '_id_x', '_id_y', 'illness_category', 'symptoms', 'arrival_time'])
    y = data['name_y']

    return X, y

# Save preprocessed data to a file
X, y = preprocess_data()
X.to_csv('X.csv', index=False)
y.to_csv('y.csv', index=False)
