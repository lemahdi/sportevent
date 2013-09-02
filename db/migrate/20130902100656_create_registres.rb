class CreateRegistres < ActiveRecord::Migration
  def change
    create_table :registres do |t|
      t.references :user, index: true
      t.references :match, index: true

      t.timestamps
    end
  end
end
