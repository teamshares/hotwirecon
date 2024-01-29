# Pin npm packages by running ./bin/importmap

pin "application"
pin "@ctrl/tinycolor", to: "@ctrl--tinycolor.js" # @4.0.3
pin "@floating-ui/core", to: "@floating-ui--core.js" # @1.6.0
pin "@floating-ui/dom", to: "@floating-ui--dom.js" # @1.6.0
pin "@floating-ui/utils", to: "@floating-ui--utils.js" # @0.2.1
pin "@floating-ui/utils/dom", to: "@floating-ui--utils--dom.js" # @0.2.1
pin "@lit/reactive-element", to: "@lit--reactive-element.js" # @2.0.3
pin "@hotwired/turbo-rails", to: "@hotwired--turbo-rails.js" # @8.0.0
pin "@hotwired/turbo", to: "@hotwired--turbo.js" # @8.0.0
pin "@rails/actioncable/src", to: "@rails--actioncable--src.js" # @7.1.3
pin "@hotwired/stimulus", to: "@hotwired--stimulus.js" # @3.2.2
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "@teamshares/shoelace", to: "https://esm.sh/@teamshares/shoelace@2.0.1/dist/shoelace.js" # @2.0.1
