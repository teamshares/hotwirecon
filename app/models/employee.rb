class Employee < ApplicationRecord
  belongs_to :company

  after_update_commit -> {
    broadcast_replace_to "employees", locals: { employee: self }
  }

  after_create_commit -> {
    broadcast_append_to "employees"
  }
end
