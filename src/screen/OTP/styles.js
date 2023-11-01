import styled from "styled-components/native";

export const OTPInputContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TextInputHidden = styled.TextInput`
  /* width: 300px;
   border-color: #F17C1D;
  border-width: 1px;
  border-radius: 5px;
  padding: 15px;
  margin-top: 50px;
  color: white; */
  position: absolute;
  opacity: 0;
 
  
  
`;

export const SplitOTPBoxesContainer = styled.Pressable`
  width: 80%;
  flex-direction: row;
  justify-content: space-evenly;
`;
///empnty box border Color
export const SplitBoxes = styled.View`
  border-color:#D9D9D9;
  border-width: 2px;
  border-radius: 5px;
  padding: 5px;
  width:40px;
  height:40px;
  backgroundColor:#FFF;
`;

export const SplitBoxText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: black;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: black;
  
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: #000000;
  padding: 20px;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-top: 30px;
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
`;
