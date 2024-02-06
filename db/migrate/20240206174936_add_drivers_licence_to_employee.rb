class AddDriversLicenceToEmployee < ActiveRecord::Migration[7.1]
  def change
    add_column :employees, :drivers_license, :text
  end
end
