# frozen_string_literal: true

require "rails_helper"

describe EmployeeField::Component, type: :component do
  subject(:component) { EmployeeField::Component.new }

  describe "view" do
    subject { render_inline(component) }

    it "renders" do
      skip # TODO: Remove this line when you're ready to add specs, e.g.:
      # expect(subject.at_css("div")).to be_present
    end
  end

  # TODO: Add unit specs for any methods you add to the component. For example:
  #
  # describe "#foo" do
  #   subject { component.send(:foo) }
  #
  #   it "does something" do
  #     is_expected.to eq "bar"
  #   end
  # end
end
