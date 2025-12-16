# tip calculator
print("welcom to tip calculater")
bill = float(input("what was the total bill? rs."))
tip = int(input("what percentage tip would you like to give?10,12,15,20,25?"))
people = int(input("how many people to split the bill?"))
tip_as_percent = tip / 100
total_tip_amount = bill * tip_as_percent
total_bill = bill + total_tip_amount
bill_per_person = total_bill / people
print(f"each person should pay: rs{bill_per_person:.2f}")
print("thank you for using the tip calculater")