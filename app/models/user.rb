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

  has_many :registres, dependent: :destroy
  has_many :matches, through: :registres

	before_save { email.downcase! }

	validates :nom   , presence: false,
										 length:   { maximum: 50 }
	validates :prenom, presence: false,
										 length:   { maximum: 50 }
	validates :email , presence:   true,
									 	 uniqueness: { case_sensitive: false }
                     
  scope :asc, -> attr { order("users.#{attr} ASC") }

  def password_required?
  	super if confirmed?
  end

  def password_match?
    self.errors[:password] << I18n.t(:no_blank, scope: 'custom.model.error') if password.blank?
    self.errors[:password_confirmation] << I18n.t(:no_blank, scope: 'custom.model.error') if password_confirmation.blank?
    self.errors[:password_confirmation] << I18n.t(:no_pwd_match, scope: 'custom.model.error') if password != password_confirmation
    password == password_confirmation && !password.blank?
  end
end
