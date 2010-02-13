# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key    => '_valhalla-rails3_session',
  :secret => '289639209c468c44e3731f79c2271d4e82cf53a3790d85d54921a6b6e81683cd0a2364118d76d89ef3fdd1ab6efdbef51dfdb8d18293f6428f6bb84901b2b12e'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
