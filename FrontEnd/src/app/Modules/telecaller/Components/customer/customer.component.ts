import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  constructor(private router: Router){

  }
    customers = [
      {
        "id": 1,
        "phoneNumber": "9876543210",
        "name": "John Doe",
        "campionName": "Campion Mobiles",
        "currentPlan": "Premium 1",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 2,
        "pinCode": "12345",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 2,
        "phoneNumber": "8765432109",
        "name": "Jane Smith",
        "campionName": "Best Deals Mobiles",
        "currentPlan": "Basic Plan",
        "currentNetwork": "NetConnect",
        "noOfConnections": 1,
        "pinCode": "54321",
        "suggestedPlan": "Standard Plan"
      },
      {
        "id": 3,
        "phoneNumber": "7654321098",
        "name": "Robert Johnson",
        "campionName": "SmartTel",
        "currentPlan": "Premium Plus",
        "currentNetwork": "MobileConnect",
        "noOfConnections": 3,
        "pinCode": "67890",
        "suggestedPlan": "Premium 2"
      },
      {
        "id": 4,
        "phoneNumber": "6543210987",
        "name": "Emily Brown",
        "campionName": "TalkTime Solutions",
        "currentPlan": "Standard Plan",
        "currentNetwork": "ConnectTel",
        "noOfConnections": 1,
        "pinCode": "98765",
        "suggestedPlan": "Basic Plan"
      },
      {
        "id": 5,
        "phoneNumber": "5432109876",
        "name": "Michael Lee",
        "campionName": "Mobile Galaxy",
        "currentPlan": "Premium 3",
        "currentNetwork": "NetConnect",
        "noOfConnections": 2,
        "pinCode": "23456",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 6,
        "phoneNumber": "4321098765",
        "name": "Sophia Wilson",
        "campionName": "Cellular World",
        "currentPlan": "Basic Plan",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 1,
        "pinCode": "78901",
        "suggestedPlan": "Standard Plan"
      },
      {
        "id": 7,
        "phoneNumber": "3210987654",
        "name": "William Davis",
        "campionName": "Mobile Mart",
        "currentPlan": "Premium Plus",
        "currentNetwork": "MobileConnect",
        "noOfConnections": 3,
        "pinCode": "34567",
        "suggestedPlan": "Premium 2"
      },
      {
        "id": 8,
        "phoneNumber": "2109876543",
        "name": "Olivia Garcia",
        "campionName": "TechTel Solutions",
        "currentPlan": "Standard Plan",
        "currentNetwork": "ConnectTel",
        "noOfConnections": 1,
        "pinCode": "89012",
        "suggestedPlan": "Basic Plan"
      },
      {
        "id": 9,
        "phoneNumber": "1098765432",
        "name": "James Rodriguez",
        "campionName": "Mobile Express",
        "currentPlan": "Premium 1",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 2,
        "pinCode": "45678",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 10,
        "phoneNumber": "0987654321",
        "name": "Isabella Martinez",
        "campionName": "FastTel",
        "currentPlan": "Basic Plan",
        "currentNetwork": "NetConnect",
        "noOfConnections": 1,
        "pinCode": "90123",
        "suggestedPlan": "Standard Plan"
      },
      {
        "id": 11,
        "phoneNumber": "9876543210",
        "name": "Alexander Anderson",
        "campionName": "PhoneZone",
        "currentPlan": "Premium Plus",
        "currentNetwork": "MobileConnect",
        "noOfConnections": 3,
        "pinCode": "56789",
        "suggestedPlan": "Premium 2"
      },
      {
        "id": 12,
        "phoneNumber": "8765432109",
        "name": "Mia Hall",
        "campionName": "Telecom Solutions",
        "currentPlan": "Standard Plan",
        "currentNetwork": "ConnectTel",
        "noOfConnections": 1,
        "pinCode": "23456",
        "suggestedPlan": "Basic Plan"
      },
      {
        "id": 13,
        "phoneNumber": "7654321098",
        "name": "Ethan White",
        "campionName": "Cellular City",
        "currentPlan": "Premium 3",
        "currentNetwork": "NetConnect",
        "noOfConnections": 2,
        "pinCode": "67890",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 14,
        "phoneNumber": "6543210987",
        "name": "Ava Turner",
        "campionName": "Mobile Masters",
        "currentPlan": "Basic Plan",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 1,
        "pinCode": "98765",
        "suggestedPlan": "Standard Plan"
      },
      {
        "id": 15,
        "phoneNumber": "5432109876",
        "name": "Daniel Stewart",
        "campionName": "SmartTel Solutions",
        "currentPlan": "Premium Plus",
        "currentNetwork": "MobileConnect",
        "noOfConnections": 3,
        "pinCode": "12345",
        "suggestedPlan": "Premium 2"
      },
      {
        "id": 16,
        "phoneNumber": "4321098765",
        "name": "Sofia Hernandez",
        "campionName": "Best Deals Mobiles",
        "currentPlan": "Standard Plan",
        "currentNetwork": "ConnectTel",
        "noOfConnections": 1,
        "pinCode": "54321",
        "suggestedPlan": "Basic Plan"
      },
      {
        "id": 17,
        "phoneNumber": "3210987654",
        "name": "David Martin",
        "campionName": "TalkTime Solutions",
        "currentPlan": "Premium 1",
        "currentNetwork": "NetConnect",
        "noOfConnections": 2,
        "pinCode": "67890",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 18,
        "phoneNumber": "2109876543",
        "name": "Victoria King",
        "campionName": "Mobile Galaxy",
        "currentPlan": "Basic Plan",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 1,
        "pinCode": "78901",
        "suggestedPlan": "Standard Plan"
      },
      {
        "id": 19,
        "phoneNumber": "1098765432",
        "name": "Jacob Lee",
        "campionName": "Cellular World",
        "currentPlan": "Premium Plus",
        "currentNetwork": "MobileConnect",
        "noOfConnections": 3,
        "pinCode": "34567",
        "suggestedPlan": "Premium 2"
      },
      {
        "id": 20,
        "phoneNumber": "0987654321",
        "name": "Sophie Gonzalez",
        "campionName": "TechTel Solutions",
        "currentPlan": "Standard Plan",
        "currentNetwork": "ConnectTel",
        "noOfConnections": 1,
        "pinCode": "89012",
        "suggestedPlan": "Basic Plan"
      },
      {
        "id": 21,
        "phoneNumber": "9876543210",
        "name": "Benjamin Adams",
        "campionName": "Mobile Express",
        "currentPlan": "Premium 1",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 2,
        "pinCode": "45678",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 22,
        "phoneNumber": "8765432109",
        "name": "Ella Wood",
        "campionName": "FastTel",
        "currentPlan": "Basic Plan",
        "currentNetwork": "NetConnect",
        "noOfConnections": 1,
        "pinCode": "90123",
        "suggestedPlan": "Standard Plan"
      },
      {
        "id": 23,
        "phoneNumber": "7654321098",
        "name": "Aiden Scott",
        "campionName": "PhoneZone",
        "currentPlan": "Premium Plus",
        "currentNetwork": "MobileConnect",
        "noOfConnections": 3,
        "pinCode": "56789",
        "suggestedPlan": "Premium 2"
      },
      {
        "id": 24,
        "phoneNumber": "6543210987",
        "name": "Scarlett Hill",
        "campionName": "Telecom Solutions",
        "currentPlan": "Standard Plan",
        "currentNetwork": "ConnectTel",
        "noOfConnections": 1,
        "pinCode": "23456",
        "suggestedPlan": "Basic Plan"
      },
      {
        "id": 25,
        "phoneNumber": "5432109876",
        "name": "Lucas Allen",
        "campionName": "Cellular City",
        "currentPlan": "Premium 3",
        "currentNetwork": "NetConnect",
        "noOfConnections": 2,
        "pinCode": "67890",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 26,
        "phoneNumber": "4321098765",
        "name": "Lily Carter",
        "campionName": "Mobile Masters",
        "currentPlan": "Basic Plan",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 1,
        "pinCode": "98765",
        "suggestedPlan": "Standard Plan"
      },
      {
        "id": 27,
        "phoneNumber": "3210987654",
        "name": "Henry Ramirez",
        "campionName": "SmartTel Solutions",
        "currentPlan": "Premium Plus",
        "currentNetwork": "MobileConnect",
        "noOfConnections": 3,
        "pinCode": "12345",
        "suggestedPlan": "Premium 2"
      },
      {
        "id": 28,
        "phoneNumber": "2109876543",
        "name": "Chloe Parker",
        "campionName": "Best Deals Mobiles",
        "currentPlan": "Standard Plan",
        "currentNetwork": "ConnectTel",
        "noOfConnections": 1,
        "pinCode": "54321",
        "suggestedPlan": "Basic Plan"
      },
      {
        "id": 29,
        "phoneNumber": "1098765432",
        "name": "Christian Evans",
        "campionName": "TalkTime Solutions",
        "currentPlan": "Premium 1",
        "currentNetwork": "NetConnect",
        "noOfConnections": 2,
        "pinCode": "67890",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 30,
        "phoneNumber": "0987654321",
        "name": "Grace Torres",
        "campionName": "Mobile Galaxy",
        "currentPlan": "Basic Plan",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 1,
        "pinCode": "78901",
        "suggestedPlan": "Standard Plan"
      },
      {
        "id": 31,
        "phoneNumber": "9876543210",
        "name": "Daniel Lewis",
        "campionName": "Cellular World",
        "currentPlan": "Premium Plus",
        "currentNetwork": "MobileConnect",
        "noOfConnections": 3,
        "pinCode": "34567",
        "suggestedPlan": "Premium 2"
      },
      {
        "id": 32,
        "phoneNumber": "8765432109",
        "name": "Bella Hill",
        "campionName": "TechTel Solutions",
        "currentPlan": "Standard Plan",
        "currentNetwork": "ConnectTel",
        "noOfConnections": 1,
        "pinCode": "23456",
        "suggestedPlan": "Basic Plan"
      },
      {
        "id": 33,
        "phoneNumber": "7654321098",
        "name": "Matthew Wright",
        "campionName": "Mobile Express",
        "currentPlan": "Premium 1",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 2,
        "pinCode": "45678",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 34,
        "phoneNumber": "6543210987",
        "name": "Luna Johnson",
        "campionName": "FastTel",
        "currentPlan": "Basic Plan",
        "currentNetwork": "NetConnect",
        "noOfConnections": 1,
        "pinCode": "90123",
        "suggestedPlan": "Standard Plan"
      },
      {
        "id": 35,
        "phoneNumber": "5432109876",
        "name": "Elijah Martinez",
        "campionName": "PhoneZone",
        "currentPlan": "Premium Plus",
        "currentNetwork": "MobileConnect",
        "noOfConnections": 3,
        "pinCode": "56789",
        "suggestedPlan": "Premium 2"
      },
      {
        "id": 36,
        "phoneNumber": "4321098765",
        "name": "Aria Robinson",
        "campionName": "Telecom Solutions",
        "currentPlan": "Standard Plan",
        "currentNetwork": "ConnectTel",
        "noOfConnections": 1,
        "pinCode": "23456",
        "suggestedPlan": "Basic Plan"
      },
      {
        "id": 37,
        "phoneNumber": "3210987654",
        "name": "Alexander Young",
        "campionName": "SmartTel Solutions",
        "currentPlan": "Premium 3",
        "currentNetwork": "NetConnect",
        "noOfConnections": 2,
        "pinCode": "67890",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 38,
        "phoneNumber": "2109876543",
        "name": "Mila Adams",
        "campionName": "Mobile Galaxy",
        "currentPlan": "Basic Plan",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 1,
        "pinCode": "78901",
        "suggestedPlan": "Standard Plan"
      },
      {
        "id": 39,
        "phoneNumber": "1098765432",
        "name": "Carter James",
        "campionName": "Cellular World",
        "currentPlan": "Premium Plus",
        "currentNetwork": "MobileConnect",
        "noOfConnections": 3,
        "pinCode": "34567",
        "suggestedPlan": "Premium 2"
      },
      {
        "id": 40,
        "phoneNumber": "0987654321",
        "name": "Avery Flores",
        "campionName": "TechTel Solutions",
        "currentPlan": "Standard Plan",
        "currentNetwork": "ConnectTel",
        "noOfConnections": 1,
        "pinCode": "89012",
        "suggestedPlan": "Basic Plan"
      },
      {
        "id": 41,
        "phoneNumber": "9876543210",
        "name": "Samantha Reed",
        "campionName": "Mobile Express",
        "currentPlan": "Premium 1",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 2,
        "pinCode": "45678",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 42,
        "phoneNumber": "8765432109",
        "name": "Logan Morgan",
        "campionName": "FastTel",
        "currentPlan": "Basic Plan",
        "currentNetwork": "NetConnect",
        "noOfConnections": 1,
        "pinCode": "90123",
        "suggestedPlan": "Standard Plan"
      },
      {
        "id": 43,
        "phoneNumber": "7654321098",
        "name": "Violet Phillips",
        "campionName": "PhoneZone",
        "currentPlan": "Premium Plus",
        "currentNetwork": "MobileConnect",
        "noOfConnections": 3,
        "pinCode": "56789",
        "suggestedPlan": "Premium 2"
      },
      {
        "id": 44,
        "phoneNumber": "6543210987",
        "name": "Eli Collins",
        "campionName": "Telecom Solutions",
        "currentPlan": "Standard Plan",
        "currentNetwork": "ConnectTel",
        "noOfConnections": 1,
        "pinCode": "23456",
        "suggestedPlan": "Basic Plan"
      },
      {
        "id": 45,
        "phoneNumber": "5432109876",
        "name": "Liam Gray",
        "campionName": "SmartTel Solutions",
        "currentPlan": "Premium 3",
        "currentNetwork": "NetConnect",
        "noOfConnections": 2,
        "pinCode": "67890",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 46,
        "phoneNumber": "4321098765",
        "name": "Aria Peterson",
        "campionName": "Mobile Masters",
        "currentPlan": "Basic Plan",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 1,
        "pinCode": "98765",
        "suggestedPlan": "Standard Plan"
      },
      {
        "id": 47,
        "phoneNumber": "3210987654",
        "name": "Luke Wright",
        "campionName": "Best Deals Mobiles",
        "currentPlan": "Premium Plus",
        "currentNetwork": "MobileConnect",
        "noOfConnections": 3,
        "pinCode": "12345",
        "suggestedPlan": "Premium 2"
      },
      {
        "id": 48,
        "phoneNumber": "2109876543",
        "name": "Penelope Rivera",
        "campionName": "TechTel Solutions",
        "currentPlan": "Standard Plan",
        "currentNetwork": "ConnectTel",
        "noOfConnections": 1,
        "pinCode": "54321",
        "suggestedPlan": "Basic Plan"
      },
      {
        "id": 49,
        "phoneNumber": "1098765432",
        "name": "Lucas Baker",
        "campionName": "TalkTime Solutions",
        "currentPlan": "Premium 1",
        "currentNetwork": "NetConnect",
        "noOfConnections": 2,
        "pinCode": "67890",
        "suggestedPlan": "Ultimate Plan"
      },
      {
        "id": 50,
        "phoneNumber": "0987654321",
        "name": "Aria Turner",
        "campionName": "Mobile Galaxy",
        "currentPlan": "Basic Plan",
        "currentNetwork": "TelecomNet",
        "noOfConnections": 1,
        "pinCode": "78901",
        "suggestedPlan": "Standard Plan"
      }
    ]

    openCustomer(id: number){
      this.router.navigateByUrl('/telecaller/customers/open/'+ id)
    }

}
