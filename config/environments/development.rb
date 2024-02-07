# frozen_string_literal: true

require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded any time
  # it changes. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join("tmp", "caching-dev.txt").exist?
    config.action_controller.perform_caching = true
    config.action_controller.enable_fragment_cache_logging = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      "Cache-Control" => "public, max-age=#{2.days.to_i}",
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Store uploaded files on the local file system (see config/storage.yml for options).
  config.active_storage.service = :local

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Raises error for missing translations.
  # config.i18n.raise_on_missing_translations = true

  # Options for the Rails Template Inpsector tool loaded in application.html.slim. You can override
  # these locally via environment variables.
  # -----------
  # @url_prefix: The string that launches your code editor from the browser. Options:
  # - Visual Studio Code: vscode://file
  # - RubyMine: x-mine://open?file=
  # - MacVIM: mvim://open?url=file://
  # - Emacs: emacs://open?url=file://
  # - IntelliJ: idea://open?file=
  # - PyCharm: pycharm://open?file=
  # - SublimeText: ??? Maybe try subl://file
  #
  #   Example: To use RubyMine, add the following line in .bashrc:
  #     export TEMPLATE_INSPECTOR_URL_PREFIX="x-mine://open?file="
  # -----------
  # @combo_key: The keyboard shortcut to launch the inspector
  # -----------
  # @no_auto_disable: Whether to automatically close the tool after taking you to your code editor
  config.template_inspector_options = {
    url_prefix: ENV["TEMPLATE_INSPECTOR_URL_PREFIX"] || "vscode://file",
    combo_key: ENV["TEMPLATE_INSPECTOR_COMBO_KEY"] || "command-shift-v",
    no_auto_disable: ENV["TEMPLATE_INSPECTOR_NO_AUTO_DISABLE"] || false,
  }

  # Annotate rendered view with file names.
  config.action_view.annotate_rendered_view_with_filenames = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  # config.file_watcher = ActiveSupport::EventedFileUpdateChecker

  # Uncomment if you wish to allow Action Cable access from any origin.
  # config.action_cable.disable_request_forgery_protection = true
end
