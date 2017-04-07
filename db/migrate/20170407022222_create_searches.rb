class CreateSearches < ActiveRecord::Migration[5.0]
  def change
    create_table :searches do |t|
      t.string :long, null: false
      t.string :lat, null: false
      t.text :location, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
      add_index :searches, :user_id, unique: true
  end
end
