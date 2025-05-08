# train_model.py

import os
import json
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# 1) Load intents.json
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INTENTS_FILE = os.path.join(BASE_DIR, 'intents.json')
with open(INTENTS_FILE, 'r', encoding='utf-8') as f:
    intents = json.load(f)['intents']

# 2) Prepare training data
X = []
y = []
for intent in intents:
    for pattern in intent['patterns']:
        X.append(pattern.lower())
        y.append(intent['tag'])

# 3) Train
vectorizer = TfidfVectorizer()
X_vec = vectorizer.fit_transform(X)

model = LogisticRegression(max_iter=200)
model.fit(X_vec, y)

# 4) Save
joblib.dump(vectorizer, os.path.join(BASE_DIR, 'vectorizer.pkl'))
joblib.dump(model, os.path.join(BASE_DIR, 'model.pkl'))

print("Training complete — vectorizer.pkl & model.pkl saved.")
