
contacts = []   # list of contact dicts

"""Add a new contact dict to the contacts list."""
def add_contact(contacts, name, phone, email):
    contacts.append({
        "name": name,
        "phone": phone,
        "email": email
    })
    
"""Return the contact dict matching name (case-insensitive). Return None if not found."""
def find_contact(contacts, name):
    for contact in contacts :
        if contact["name"].lower() == name.lower() :
            return contact
    return None

def display_found_contact(contacts, name) :
    contact = find_contact(contacts, name)
    if contact : 
        print(f"\nFound: {contact['name']} - Phone: {contact['phone']}")
    else :
        print(f"\n{name} not found in contacts.")

"""Print all contacts in a formatted table. Print 'No contacts found.' if the list is empty."""
def list_contacts(contacts):
    print(f"\n{'Name':<10} {'Phone':<12} {'Email':<12}")
    print("-" * 40)
    if len(contacts) == 0 :
        print("No contacts found.")
    else :
        for contact in contacts :
            print(f"{contact.get('name'):<10} {contact.get('phone'):<12} {contact.get('email'):<12}")

# ── Demo ──────────────────────────────────────────────────────────────
list_contacts(contacts)

# TODO: add contact
add_contact(contacts, 'Ismail', 88888888888, 'ismail@gmail.com')
add_contact(contacts, 'Hasan', 99999999999, 'hasan@gmail.com')

# TODO: list all contacts
list_contacts(contacts)

# TODO: find one contact by name and print their phone number
display_found_contact(contacts, 'ismail')

# TODO: search for a contact that does not exist and print a "not found" message
display_found_contact(contacts, 'muhammad')