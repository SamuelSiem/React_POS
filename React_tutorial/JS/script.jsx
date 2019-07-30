var Product = React.createClass({

  getInitialState: function(){
    return{qty:0};
  },
  
  buy: function(){
    this.setState({qty: this.state.qty+1});
    this.props.handleTotal(this.props.price);
  },
  
  cancel: function(){
    if(this.state.qty>0){
      this.setState({qty: this.state.qty-1});
      this.props.minusTotal(this.props.price);
    }else{
    }
  },
  
    show: function(){
    this.props.handleShow(this.props.name);
  },
  
  render: function(){
    return(
      <div>
        <p>{this.props.name} - ${this.props.price}</p>
        <div>
          <button onClick={this.buy}>Add</button>
          <button onClick={this.cancel}>cancel</button>
        </div>
        <button onClick={this.show}>Show</button>
        <h3>Quantity: {this.state.qty} item(s)</h3>
        <hr/>      
      </div>
      );
  }
});

var Total = React.createClass({
  render: function(){
    return(
      <div>
        <h3>Total Cart: ${this.props.total}</h3>
      </div>
      )
  }
});

var ProductForm = React.createClass({
  submit: function(e){
    e.preventDefault();
    
    var product = {
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value)
    }
    
    this.props.handleCreate(product);
    
    this.refs.name.value = "";
    this.refs.price.value = "";
  },
  
  render: function(){
    return(
      <form onSubmit={this.submit}>
        <input type="text" placeholder="Product name" ref="name"/>
        <input type="text" placeholder="Product price" ref="price"/>
        <br/>
        <button>Create Product</button>
        <hr/>
      </form>
      )
  }
});

var ProductList = React.createClass({
  getInitialState: function(){
    return{total: 0,
      productList: [
        {name: "Android", price: 121},
        {name: "Apple", price: 154},
        {name: "Nokia", price: 65}]
    };
  },
  
  createProduct: function(product){
    this.setState({
      productList: this.state.productList.concat(product)
    })
  },
  
  calculateTotal: function(price){
    this.setState({total: this.state.total + price});
  },
  
  minusTotal: function(price){
    this.setState({total: this.state.total - price});
  },
  
  showProduct: function(name){
    alert("Your selected " + name);
  },
  
  render: function(){
    var component = this;
    var products = this.state.productList.map(function(product){
      return(
        <Product name={product.name} price={product.price} 
        handleShow={component.showProduct} 
        handleTotal={component.calculateTotal} 
        minusTotal={component.minusTotal}/>
        ) 
    });
    
    return(
      <div>
      <ProductForm handleCreate={this.createProduct}/>
      {products}
         <Total total={this.state.total}/>
      </div>
      )
  }
});
React.render(<ProductList/>, document.getElementById("root"));
