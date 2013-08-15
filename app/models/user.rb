class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :token_authenticatable, :confirmable, :lockable,
  			 :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

	attr_accessible :nom, :prenom, :email,
									:password, :password_confirmation,
									:remember_me

	before_save { email.downcase! }

	validates :nom   , presence: false,
										 length:   { maximum: 50 }
	validates :prenom, presence: false,
										 length:   { maximum: 50 }
	validates :email , presence:   true,
									 	 uniqueness: { case_sensitive: false }

  def password_required?
  	super if confirmed?
  end

  def password_match?
    self.errors[:password] << "ne peut pas être vide" if password.blank?
    self.errors[:password_confirmation] << "ne peut pas être vide" if password_confirmation.blank?
    self.errors[:password_confirmation] << "ne correspond pas au mot de passe" if password != password_confirmation
    password == password_confirmation && !password.blank?
  end
end
