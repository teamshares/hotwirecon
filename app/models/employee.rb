class Employee < ApplicationRecord
  belongs_to :company

  after_update_commit -> {
    broadcast_replace_to "employee", locals: { employee: self }
  }
end
