class CreateFields < ActiveRecord::Migration
  def change
    create_table :fields do |t|
      t.string :street
      t.string :city
      t.string :country
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
