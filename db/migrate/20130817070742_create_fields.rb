class CreateFields < ActiveRecord::Migration
  def up
    create_table :fields do |t|
      t.string :street
      t.string :city
      t.string :country
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end

  def down
    drop_table :fields
  end
end
