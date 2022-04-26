class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username
      t.string :email
      t.string :password_digest
      t.belongs_to :franchise, foreign_key: true

      t.timestamps
    end
  end
end
