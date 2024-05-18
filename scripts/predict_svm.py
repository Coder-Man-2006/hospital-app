# predict_svm.py
import joblib
import pandas as pd

def predict_svm(new_data):
    # Load the trained model
    model = joblib.load('doctor_assignment_svm.pkl')
    predictions = model.predict(new_data)
    return predictions

# Example usage
new_data = pd.read_csv('new_data.csv')  # Replace with actual new data
predictions = predict_svm(new_data)
print(predictions)
