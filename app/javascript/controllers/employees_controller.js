import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="employees"
export default class extends Controller {
  static targets = ["searchInput"]

  connect() {
    console.log("Connected");
  }
}
