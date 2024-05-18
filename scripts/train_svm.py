# train_svm.py
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
import joblib
import pandas as pd

def train_svm(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = SVC(probability=True)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))

    joblib.dump(model, 'doctor_assignment_svm.pkl')

# Load preprocessed data
X = pd.read_csv('X.csv')
y = pd.read_csv('y.csv').values.ravel()  # Ensure y is a 1D array

train_svm(X, y)
