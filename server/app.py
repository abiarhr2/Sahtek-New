from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import os

app = Flask(__name__)
CORS(app)

# Load intents from JSON file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INTENTS_FILE = os.path.join(BASE_DIR, 'chatbot', 'intents.json')

with open(INTENTS_FILE, 'r', encoding='utf-8') as f:
    data = json.load(f)['intents']

# Prepare training data
X, y = [], []
for intent in data:
    for phrase in intent['patterns']:
        X.append(phrase.lower())
        y.append(intent['tag'])

# Train model
vectorizer = TfidfVectorizer()
X_vec = vectorizer.fit_transform(X)
model = LogisticRegression(max_iter=200)
model.fit(X_vec, y)

# Save the model and vectorizer to avoid retraining on every start
import pickle
with open('model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

with open('vectorizer.pkl', 'wb') as vec_file:
    pickle.dump(vectorizer, vec_file)

# Response function to get the chatbot reply
def get_response(message: str) -> str:
    # Load the trained model and vectorizer if not already loaded
    with open('model.pkl', 'rb') as model_file:
        model = pickle.load(model_file)

    with open('vectorizer.pkl', 'rb') as vec_file:
        vectorizer = pickle.load(vec_file)

    # Predict the response
    msg_vec = vectorizer.transform([message.lower()])
    tag = model.predict(msg_vec)[0]
    
    for intent in data:
        if intent['tag'] == tag:
            return random.choice(intent['responses'])
    return "Sorry, I don't know how to help with that."

# API endpoint to handle chat requests
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if user_message:
        bot_response = get_response(user_message)
        return jsonify({'response': bot_response})
    return jsonify({'response': 'No message received'}), 400

if __name__ == '__main__':
    app.run(debug=True)
