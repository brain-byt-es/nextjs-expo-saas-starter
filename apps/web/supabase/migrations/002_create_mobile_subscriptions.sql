-- Mobile In-App Purchase Subscriptions Table (RevenueCat)
CREATE TABLE mobile_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  revenuecat_user_id TEXT UNIQUE NOT NULL,
  product_id TEXT NOT NULL,
  store TEXT DEFAULT 'apple', -- apple, google, stripe
  status TEXT DEFAULT 'active', -- active, canceled, payment_failed, etc.
  auto_resume_date TIMESTAMP,
  expiration_date TIMESTAMP,
  purchase_date TIMESTAMP,
  canceled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Mobile Payment Records
CREATE TABLE mobile_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  revenuecat_user_id TEXT NOT NULL,
  transaction_id TEXT UNIQUE,
  product_id TEXT NOT NULL,
  amount BIGINT, -- Amount in cents
  currency TEXT DEFAULT 'usd',
  store TEXT, -- apple, google, stripe
  status TEXT DEFAULT 'completed', -- completed, failed, pending
  receipt_data JSONB, -- Store receipt data
  purchased_at TIMESTAMP,
  failed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY (revenuecat_user_id) REFERENCES mobile_subscriptions(revenuecat_user_id)
);

-- Indexes
CREATE INDEX idx_mobile_subscriptions_status ON mobile_subscriptions(status);
CREATE INDEX idx_mobile_subscriptions_revenuecat_id ON mobile_subscriptions(revenuecat_user_id);
CREATE INDEX idx_mobile_subscriptions_store ON mobile_subscriptions(store);
CREATE INDEX idx_mobile_payments_subscription ON mobile_payments(revenuecat_user_id);
CREATE INDEX idx_mobile_payments_status ON mobile_payments(status);

-- Enable RLS
ALTER TABLE mobile_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mobile_payments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own mobile subscription"
  ON mobile_subscriptions
  FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can view their own mobile payments"
  ON mobile_payments
  FOR SELECT
  USING (TRUE);
