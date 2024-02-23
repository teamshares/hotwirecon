import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "display", "edit", "form", "input" ];
  static values = { initial: String }

  showForm() {
    this.editTarget.classList.remove("opacity-0");
  }

  hideForm() {
    this.editTarget.classList.add("opacity-0");
  }

  onFocusOut(event) {
    this.hideForm();
    if (this.inputTarget.value !== this.initialValue) {
      this.formTarget.requestSubmit();
    }
  }
}