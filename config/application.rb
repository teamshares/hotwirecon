# frozen_string_literal: true

require_relative "boot"

require "rails"

# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
# require "action_mailbox/engine"
require "action_view/railtie"
# require "action_cable/engine"
# require "action_text/engine"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Accounting
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    mailer_asset_host = TS.deploy_context.review? ? "https://#{ENV.fetch('HEROKU_APP_NAME')}.herokuapp.com" : ENV["MAILER_URL"]
    config.action_mailer.asset_host = mailer_asset_host

    # Clearing out unwanted entries from Rails.application.config.assets.paths (working around propshaft defaults)
    TS::Assets.clean_asset_paths!(config, {
      # chartkick: "vendor/assets/javascripts",
    })
  end
end
