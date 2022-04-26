class CreateGeolayers < ActiveRecord::Migration[6.1]
  def change
    create_table :geolayers do |t|
      t.string :name
      t.string :enabled
      t.string :layer_type
      t.string :source
      t.string :uri
      t.string :filter
      t.integer :franchise_id

      t.timestamps
    end
  end
end
