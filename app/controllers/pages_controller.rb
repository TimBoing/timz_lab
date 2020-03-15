class PagesController < ApplicationController
  skip_before_action :authenticate_user!

  def home
  end

  def fonts
  end

  def loaders
  end

  def visit_card
  end

  def themes
  end

  def oeil
    @jojo = 32
    @table = (1..20)
  end

end
