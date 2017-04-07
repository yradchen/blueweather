class RemoveUniqueFromSearch < ActiveRecord::Migration[5.0]
  def change
    remove_index :searches, [:user_id]
  end
end
