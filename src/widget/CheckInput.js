
const CheckInput = {
    isPhone: function (phone){
        if(!(/^1[34578]\d{9}$/.test(phone))){
            return true;
        }
        return false;
    },
    isNumber : function (number){
        if(!(/^[0-9]*$/.test(number))){
            return true;
        }
        return false;
    },
    isIDCard : function (id) {
        if (!(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/).test(id)){
            return true;
        }
        return false;
    }
};
export default CheckInput;