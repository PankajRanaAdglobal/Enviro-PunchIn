import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icon if using vector icons
import CheckCricle from '../../../assets/image/svg/check-circle.svg';
import Circle from '../../../assets/image/svg/circle.svg';
const ApprovalPopup = ({visible, onClick, title}) => {
  return (
    <View style={styles.container}>
      {/* Modal for the popup */}
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        // onRequestClose={() => setIsVisible(false)} // Handle back button close
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {title == 'Entry has been Approved' ? <CheckCricle /> : <Circle />}

            {/* Popup text */}
            <Text style={styles.approvalText}>{title}</Text>

            {/* Button to close the popup */}
            <TouchableOpacity style={styles.okayButton} onPress={onClick}>
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triggerButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  approvalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  okayButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  okayButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ApprovalPopup;
