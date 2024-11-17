import os
import stripe
import uuid
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

# Flask and Database setup
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Stripe API keys (replace with your keys from environment variables)
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_51QM6VNGCcYURSIrvAf46MdSm6YreckKIUovZTSwmTwx7jvqgTMQoiy1ZQMBr5CkdUqtcVwdnPavIEG1Etv27zpty00TprrkIXZ")
STRIPE_PUBLIC_KEY = os.getenv("STRIPE_PUBLIC_KEY", "pk_test_51QM6VNGCcYURSIrvgcaZhOKsRiklESu8fpAHT8KhmSFjhZll7lqKAYgiAwNaLw0HWxsR6JdvZLt3hJUGfZChEkHR00yGWOPcpo")

# Database models
class LicenseKey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(80), unique=True, nullable=False)
    license_key = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), nullable=False)

# Routes
@app.route("/")
def index():
    return render_template("checkout.html", public_key=STRIPE_PUBLIC_KEY)

@app.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    # Get user email from the request
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Create Stripe Checkout Session
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {"name": "License Key"},
                        "unit_amount": 2000,  # $20.00
                    },
                    "quantity": 1,
                },
            ],
            success_url="http://127.0.0.1:5000/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url="http://127.0.0.1:5000/",
        )
        return jsonify({"id": session.id})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/success")
def success():
    session_id = request.args.get("session_id")
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        customer_email = session.get("customer_details", {}).get("email")

        if not customer_email:
            return jsonify({"error": "Customer email not found"}), 400

        # Generate User ID and License Key
        user_id = str(uuid.uuid4())
        license_key = str(uuid.uuid4())

        # Save to database
        new_license = LicenseKey(
            user_id=user_id, license_key=license_key, email=customer_email)
        db.session.add(new_license)
        db.session.commit()

        return render_template("success.html", user_id=user_id, license_key=license_key)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/retrieve-license", methods=["POST"])
def retrieve_license():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    license_record = LicenseKey.query.filter_by(email=email).first()
    if not license_record:
        return jsonify({"error": "No license found for this email"}), 404

    return jsonify({"user_id": license_record.user_id, "license_key": license_record.license_key})

if __name__ == "__main__":
    # Ensure the database is created within the app context
    with app.app_context():
        db.create_all()

    # Run the application
    app.run(debug=True)
