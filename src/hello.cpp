#include <bits/stdc++.h>
using namespace std;

int abhinay(vector<int>&nums){
    int sum = 0;
    for(int i=0;i<nums.size();i++){
        sum+=nums[i];
    }
    return sum;
}
int main(){
    vector<int>a = {1,2,3,4,5};
    int ans = abhinay(a);
    cout<<ans<<endl;
}