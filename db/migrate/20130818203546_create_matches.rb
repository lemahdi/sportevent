class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.date :start
      t.integer :duration
      t.references :field, index: true

      t.timestamps
    end
  end
end
