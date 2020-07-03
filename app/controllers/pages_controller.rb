class PagesController < ApplicationController
  skip_before_action :authenticate_user!

  def home
    # client = IEX::Api::Client.new
    client = IEX::Api::Client.new(
      publishable_token: ENV['IEX_API_PUBLISHABLE_TOKEN'],
      secret_token: ENV['IEX_API_SECRET_TOKEN'],
      endpoint: 'https://sandbox.iexapis.com/v1'
    )

    @sectors = client.sectors('MARKET')
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

  def max

  end


  def three
  end

  def three_sandbox
  end

  def fractal_tree
  end

  def clean_three
  end

  def bn
  end


end
