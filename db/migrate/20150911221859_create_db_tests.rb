class CreateDbTests < ActiveRecord::Migration
  def change
    create_table :db_tests do |t|

      t.timestamps null: false
    end
  end
end
