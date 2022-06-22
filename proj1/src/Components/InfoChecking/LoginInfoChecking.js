function LoginInfoChecking(pnum, password) {
    //add +6 infront of pnum if not available
    var pnum1 = ""
    if (pnum.substring(0, 2) === "+6") {
      pnum1 = pnum.slice(2);
    } else if (pnum.substring(0, 1) === "6" || pnum.substring(0, 1) === "+") {
      pnum1 = pnum.slice(1);
    } else {
      pnum1 = pnum;
    }
  
    if (pnum === "" || password === "") {
      return {
        text: "Please enter all information",
        class: "f-alter-error",
        error: true,
      };
    } else if(password.length <8){
      return {
        text: "Please enter password longer than 8 characters",
        class: "f-alter-error",
        error: true,
      };
    }
    else if (!pnum1.match(/^(01)[0-46-9]*[0-9]{7,8}$/g)) {
      console.log(pnum1)
      return {
        text: "Please enter valid phone number",
        class: "f-alter-error",
        error: true,
      };
    } else {
      const head = "+6";
      const pnum2 = head.concat(pnum1);
      return {
        error: false,
        datas: {
          PNum: pnum2,
          Password: password,
        },
      };
    }
}

export default LoginInfoChecking