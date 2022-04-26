class CreateFranchises < ActiveRecord::Migration[6.1]
  def change
    create_table :franchises do |t|
      t.string :name
      t.string :full_name
      t.string :contact_email
      t.timestamps
    end
  end
end
