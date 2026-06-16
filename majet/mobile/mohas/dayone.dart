// to tacke inpute from the user
import 'dart:io';
void main(){
  double?num1,num2,result;
  num1=double.parse(stdin.readLineSync()!);
  num2=double.parse(stdin.readLineSync()!);
  result=num1+num2;
  print("the sum is $result");
}