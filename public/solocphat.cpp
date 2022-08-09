#include<bits/stdc++.h>
using namespace std;
bool ok=true;
int a[20];
int n;
void init(){
	for(int i=1;i<=n-2;i++){
		a[i]=6;
	}
}
bool kiemtra(){
	for(int i=1;i<=n-2;i++){
		if(a[1]==8) return false;
		if(a[i]==8 && a[i+1] ==8) return false;
		if(a[i]==6 && a[i+1]==6 && a[i+2]== 6){
			if(a[i+3]==6 || i==n-2-2) return false;
		}   
	}
	return true;
}
void xuat(){
	cout << 8;
	for(int i=1;i<=n-2;i++) cout <<a[i];
	cout <<6<<endl;
}
void sinh(){
	int i = n-2;
	while(i>0 && a[i] == 8){
		a[i]=6; 
		i--;
	} 
	if(i>0){
		a[i]=8;
	}
	else ok=false;
}
int main(){
	cin >>n;
	init();
	while(ok){
		bool check = kiemtra();
		if(kiemtra()) xuat();
		sinh();
	}
}
