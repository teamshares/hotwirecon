import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("connected");
  }

  show(event) {
    const url = event.currentTarget.dataset.href;
    Turbo.visit(url, { frame: "results" });
  }
}