class CreateMatches < ActiveRecord::Migration
  def up
    create_table :matches do |t|
      t.date :start
      t.integer :duration
      t.references :field, index: true

      t.timestamps
    end
  end

  def down
  	drop_table :matches
  end
end
