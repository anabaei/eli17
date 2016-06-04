class CreateSfuprojects < ActiveRecord::Migration
  def change
    create_table :sfuprojects do |t|
      t.string :author
      t.string :text
      t.string :comment

      t.timestamps null: false
    end
  end
end
