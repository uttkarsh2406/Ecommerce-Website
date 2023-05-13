let initalState=[]

if(typeof window!=='undefined'){
    if(localStorage.getItem('cart')){
        initalState=JSON.parse(localStorage.getItem('cart'))
    }
    else{
        initalState=[];
    }
}

export const cartReducer=(state=initalState,action)=>{
    switch (action.type){
        case "ADD_TO_CART":
            return action.payload;
        default:
            return state
    }
}