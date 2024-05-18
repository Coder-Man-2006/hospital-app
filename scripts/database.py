# database.py (Python script to extract data from MongoDB)
import pymongo
import pandas as pd

def fetch_data():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client.hospital
    doctors = pd.DataFrame(list(db.doctors.find()))
    patients = pd.DataFrame(list(db.patients.find()))

    return doctors, patients

doctors, patients = fetch_data()
