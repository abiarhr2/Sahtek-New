# chatbot_model.py

import os
import json
import random
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load intents
with open(os.path.join(BASE_DIR, 'intents.json'), 'r', encoding='utf-8') as f:
    intents = json.load(f)['intents']

# Load vectorizer & model
vectorizer = joblib.load(os.path.join(BASE_DIR, 'vectorizer.pkl'))
model      = joblib.load(os.path.join(BASE_DIR, 'model.pkl'))

def get_response(message: str) -> str:
    msg_vec = vectorizer.transform([message.lower()])
    tag = model.predict(msg_vec)[0]
    for intent in intents:
        if intent['tag'] == tag:
            return random.choice(intent['responses'])
    return "Sorry, I don't know how to help with that."
