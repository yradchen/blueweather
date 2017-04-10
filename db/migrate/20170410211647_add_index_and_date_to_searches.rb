class AddIndexAndDateToSearches < ActiveRecord::Migration[5.0]
  def change
      add_index :searches, :user_id
      add_column :searches, :date, :string
  end
end
